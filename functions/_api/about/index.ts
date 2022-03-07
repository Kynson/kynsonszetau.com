import { serve } from '@kynson/about';

export async function onRequestGet({ request, env }) {
  return await serve(request, env);
}