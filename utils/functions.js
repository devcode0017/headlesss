import { format } from 'date-fns';

export function formatDate(date) {
  return format(new Date(date), 'MMMM dd, yyyy');
}

export function metaDescription(str) {
  return str.replace(/^(.{135}[^\s]*).*/, '$1').trim() + '...';
}

export function removeTags(str) {
  return str.toString().replace(/(<([^>]+)>)/gi, '');
}
