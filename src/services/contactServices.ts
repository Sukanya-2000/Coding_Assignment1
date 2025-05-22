import { Contact } from "../models/Contact";
import { Op } from "sequelize";

interface IdentifyRequest {
  email?: string | null;
  phoneNumber?: string | null;
}

interface ConsolidatedContact {
  primaryContatctId: number;
  emails: string[];
  phoneNumbers: string[];
  secondaryContactIds: number[];
}

export async function identifyContact(input: IdentifyRequest): Promise<ConsolidatedContact> {
  const { email, phoneNumber } = input;

  if (!email && !phoneNumber) {
    throw new Error("At least one of email or phoneNumber must be provided");
  }

  // Find all contacts that match email or phoneNumber (excluding deleted)
  const contacts = await Contact.findAll({
    where: {
      [Op.or]: [
        ...(email ? [{ email }] : []),
        ...(phoneNumber ? [{ phoneNumber }] : [])
      ],
      deletedAt: null,
    },
  });

  // If no contacts, create a new primary contact and return it
  if (contacts.length === 0) {
    const newContact = await Contact.create({
      email: email ?? null,
      phoneNumber: phoneNumber ?? null,
      linkedId: null,
      linkPrecedence: "primary",
    });

    return {
      primaryContatctId: newContact.id,
      emails: newContact.email ? [newContact.email] : [],
      phoneNumbers: newContact.phoneNumber ? [newContact.phoneNumber] : [],
      secondaryContactIds: [],
    };
  }

  // We have some contacts - get all linked contacts by expanding the linked chain

  // Find all linked contacts (linkedId = primary's id or id itself)
  // First find the primary contact - the oldest contact without linkedId or with linkedId = null OR linkedId = primary.id

  // Find all connected contact IDs (recursive)

  // Step 1: Determine all contacts that belong to this user:
  // We need to find the minimal primary contact id that links all found contacts

  // Gather primary contact ids from contacts: if linkedId is null -> self is primary else linkedId is primary
  const primaryIds = contacts.map(c => c.linkPrecedence === "primary" ? c.id : c.linkedId!).filter(Boolean);

  // The smallest primaryId will be considered the "main" primary contact (oldest)
  const primaryId = Math.min(...primaryIds);

  // Fetch all contacts linked to this primaryId (including primary itself)
  const allLinkedContacts = await Contact.findAll({
    where: {
      [Op.or]: [
        { id: primaryId },
        { linkedId: primaryId },
      ],
      deletedAt: null,
    },
  });

  // From the incoming request, check if there's any new info
  // i.e. if (email or phoneNumber) does not exist in allLinkedContacts

  const existingEmails = new Set(allLinkedContacts.filter(c => c.email).map(c => c.email!.toLowerCase()));
  const existingPhones = new Set(allLinkedContacts.filter(c => c.phoneNumber).map(c => c.phoneNumber!));

  let hasNewEmail = email ? !existingEmails.has(email.toLowerCase()) : false;
  let hasNewPhone = phoneNumber ? !existingPhones.has(phoneNumber) : false;

  // If both new email and new phone are null/undefined or exist already, no new contact needed
  if (hasNewEmail || hasNewPhone) {
    // create secondary contact linked to primaryId
    await Contact.create({
      email: email ?? null,
      phoneNumber: phoneNumber ?? null,
      linkedId: primaryId,
      linkPrecedence: "secondary",
    });
  }

  // **Handle the special case where we may need to merge two primaries** (if multiple primaries found)
  // If primaryIds.length > 1 => multiple primaries found that should be merged

  if (primaryIds.length > 1) {
    // The oldest primaryId is main, others must be converted to secondary and linked to main primary
    const secondariesToUpdate = primaryIds.filter(id => id !== primaryId);

    for (const secondaryPrimaryId of secondariesToUpdate) {
      // Update those primary contacts to be secondary, linked to main primaryId
      await Contact.update(
        {
          linkedId: primaryId,
          linkPrecedence: "secondary",
          updatedAt: new Date(),
        },
        {
          where: {
            id: secondaryPrimaryId,
          },
        }
      );

      // Also update all contacts linked to that secondaryPrimaryId to link to main primaryId
      await Contact.update(
        {
          linkedId: primaryId,
          updatedAt: new Date(),
        },
        {
          where: {
            linkedId: secondaryPrimaryId,
          },
        }
      );
    }
  }

  // Re-fetch all linked contacts after potential merges
  const finalContacts = await Contact.findAll({
    where: {
      [Op.or]: [
        { id: primaryId },
        { linkedId: primaryId },
      ],
      deletedAt: null,
    },
  });

  // Prepare response fields:

  const primaryContact = finalContacts.find(c => c.id === primaryId)!;

  const emailsSet = new Set<string>();
  const phonesSet = new Set<string>();
  const secondaryContactIds: number[] = [];

  // Primary contact emails and phones first
  if (primaryContact.email) emailsSet.add(primaryContact.email.toLowerCase());
  if (primaryContact.phoneNumber) phonesSet.add(primaryContact.phoneNumber);

  for (const contact of finalContacts) {
    if (contact.id === primaryId) continue;
    secondaryContactIds.push(contact.id);
    if (contact.email) emailsSet.add(contact.email.toLowerCase());
    if (contact.phoneNumber) phonesSet.add(contact.phoneNumber);
  }

  // Sort arrays and put primary contact's email/phone at front
  const emails = [primaryContact.email ?? "", ...Array.from(emailsSet).filter(e => e !== (primaryContact.email ?? "").toLowerCase())].filter(Boolean);
  const phoneNumbers = [primaryContact.phoneNumber ?? "", ...Array.from(phonesSet).filter(p => p !== (primaryContact.phoneNumber ?? ""))].filter(Boolean);

  return {
    primaryContatctId: primaryId,
    emails,
    phoneNumbers,
    secondaryContactIds,
  };
}
