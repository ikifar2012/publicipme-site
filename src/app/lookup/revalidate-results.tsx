"use server"
import { revalidatePath } from 'next/cache';
export default async function revalidateResults() {
    console.log('Revalidating /lookup');
    revalidatePath('/lookup');
  return true;
}
