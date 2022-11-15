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

export const destructureFields = (data, name) => {
  if (!data || !Object.keys(data).length) return {};

  const obj = {};

  Object.keys(data).forEach((key) => {
    if (key.includes(name)) {
      obj[key] = data[key];
    }
  });

  return obj;
};
