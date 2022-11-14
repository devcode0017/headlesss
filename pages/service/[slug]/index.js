import { HeroSection } from '../../../components/serviceComponents/HeroSection';
import { SectionTwo } from '../../../components/serviceComponents/SectionTwo';
import { getPageSections, fetchAPI } from '../../../lib/api';

export default function ServicePage({ data }) {
  const { h1 = '', herobg = '', heroh2 = '', herop = '' } = data || {};

  const {
    sectwoH3 = '',
    sectwoH4 = '',
    sectwoP = '',
    sectwoleftimg = '',
    sectwoexpClosed = '',
    sectwoexpH3 = '',
    sectwoexpOpen = '',
    sectwoexpP = '',
    sectwoexpPStrong = ''
  } = data || {};

  return (
    <>
      <HeroSection data={{ h1, herobg, heroh2, herop }} />

      <SectionTwo data={{ sectwoH3, sectwoH4, sectwoP, sectwoleftimg, sectwoexpClosed, sectwoexpH3, sectwoexpOpen, sectwoexpP, sectwoexpPStrong }} />

      <p>abc</p>
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
            h1
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
      data: {
        ...sectionsData
      }
    }
  };
}
