import { pgTable, serial, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const emailSubscribers = pgTable('email_subscribers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  locale: varchar('locale', { length: 5 }).notNull().default('en'),
  subscribedAt: timestamp('subscribed_at').defaultNow(),
});

export const tripInquiries = pgTable('trip_inquiries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  preferredDates: text('preferred_dates'),
  groupSize: integer('group_size'),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sponsorContacts = pgTable('sponsor_contacts', {
  id: serial('id').primaryKey(),
  companyName: varchar('company_name', { length: 255 }).notNull(),
  contactName: varchar('contact_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  interestedTier: varchar('interested_tier', { length: 50 }),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const tournamentRegistrations = pgTable('tournament_registrations', {
  id: serial('id').primaryKey(),
  tournamentId: varchar('tournament_id', { length: 100 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  teamName: varchar('team_name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});
