import { CustomSection } from '../components/CustomSection';
import { getSection } from '../lib/api';

interface Props {
  sectionData: {
    fieldGroupName: string;
    h1: string;
    h6: string;
    p: string;
    bg: {
      mediaItemUrl: string;
    };
  };
}

export default function Test({ sectionData }: Props) {
  return (
    <div>
      <CustomSection sectionData={sectionData} />
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getSection('newservicep', 'car-shipping-cost');

  return {
    props: {
      sectionData: data as Props['sectionData']
    } // will be passed to the page component as props
  };
}
