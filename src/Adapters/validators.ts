// ─── Zod ──────────────────────────────────────────────────────────────────────

interface ParseableSchema<T> {
  parse: (raw: unknown) => T;
}

/**
 * Creates a validate function from any Zod-compatible schema.
 *
 * @example
 * import { z } from 'zod';
 * const UserPrefsSchema = z.object({ theme: z.string() });
 *
 * const userPrefsStore = StorageStore.create({
 *   store: fromWebStorage(localStorage, 'user_prefs'),
 *   validate: withZod(UserPrefsSchema),
 * });
 */
export function withZod<T>(schema: ParseableSchema<T>): (raw: unknown) => T {
  return (raw) => schema.parse(raw);
}

// ─── Yup ─────────────────────────────────────────────────────────────────────

interface YupSchema<T> {
  validateSync: (value: unknown, options?: object) => T;
}

/**
 * Creates a validate function from a Yup schema.
 *
 * @example
 * import { object, string } from 'yup';
 * const UserPrefsSchema = object({ theme: string().required() });
 *
 * const userPrefsStore = StorageStore.create({
 *   store: fromWebStorage(localStorage,'user_prefs'),
 *   validate: withYup(UserPrefsSchema),
 * });
 */
export function withYup<T>(schema: YupSchema<T>): (raw: unknown) => T {
  return (raw) => schema.validateSync(raw);
}

// ─── Joi ─────────────────────────────────────────────────────────────────────

interface JoiSchema<T> {
  validate: (value: unknown, options?: object) => { error?: Error; value: T };
}

/**
 * Creates a validate function from a Joi schema.
 *
 * @example
 * import Joi from 'joi';
 * const UserPrefsSchema = Joi.object({ theme: Joi.string().required() });
 *
 * const userPrefsStore = StorageStore.create({
 *   store: fromWebStorage(localStorage,'user_prefs'),
 *   validate: withJoi(UserPrefsSchema),
 * });
 */
export function withJoi<T>(schema: JoiSchema<T>): (raw: unknown) => T {
  return (raw) => {
    const { error, value } = schema.validate(raw);
    if (error) throw error;
    return value;
  };
}

// ─── Valibot ──────────────────────────────────────────────────────────────────

type ValibotParser<T> = (data: unknown) => T;

/**
 * Creates a validate function from a Valibot schema.
 *
 * @example
 * import * as v from 'valibot';
 * const UserPrefsSchema = v.object({ theme: v.string() });
 *
 * const userPrefsStore = StorageStore.create({
 *   store: fromWebStorage(localStorage,'user_prefs'),
 *   validate: withValibot((data) => v.parse(UserPrefsSchema, data)),
 * });
 */
export function withValibot<T>(parser: ValibotParser<T>): (raw: unknown) => T {
  return (raw) => parser(raw);
}
