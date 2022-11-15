import ErrorPage from 'next/error';

import { fetchAPI } from '../../../lib/api';
import { destructureFields } from '../../../utils/functions';
import { SectionTwo } from '../../../components/serviceComponents/SectionTwo';
import { HeroSection } from '../../../components/serviceComponents/HeroSection';

export default function ServicePage({ data }) {
  const heroSectionData = destructureFields(data, 'hero');
  const sectionTwoData = destructureFields(data, 'sectwo');

  if (!data || !Object.keys(data).length) return <ErrorPage statusCode={404} />;

  return (
    <>
      <HeroSection data={heroSectionData} />
      <SectionTwo data={sectionTwoData} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const pageSectionName = 'ServicePage';

  const apiData = await fetchAPI(`
  {
    pages(where: {name: "${slug}"}) {
      edges {
        node {
          id
          slug
          ${pageSectionName} {
            fieldGroupName
            heroh1
            herobg {
              mediaItemUrl
            }
            heroh2
            herop
            sectwoH3
            sectwoH4
            sectwoP
            sectwoleftimg {
              mediaItemUrl
            }
            sectwoexpClosed {
              ... on Post {
                id
                excerpt
              }
            }
            sectwoexpH3
            sectwoexpOpen {
              target
              title
              url
            }
            sectwoexpP
            sectwoexpPStrong
          }
        }
      }
    }
  }
    `);

  const sectionsData = apiData?.pages?.edges?.[0]?.node[pageSectionName] || null;

  return {
    props: {
      data: sectionsData
    }
  };
}
