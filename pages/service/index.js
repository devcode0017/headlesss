import ErrorPage from 'next/error';

export default function Services() {
  return <ErrorPage statusCode={404} />;
}
