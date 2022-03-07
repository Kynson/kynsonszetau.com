import { trigger } from '@kynson/about';

export async function onRequestPost({ env }) {
  return await trigger(env);
}