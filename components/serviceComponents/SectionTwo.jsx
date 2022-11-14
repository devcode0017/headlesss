import { styled } from 'goober';

export const SectionTwo = ({ data }) => {
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
  } = data;

  return (
    <Container>
      <SectionLeft>
        <ImageContainer>
          <img src={sectwoleftimg.mediaItemUrl} alt='' />
        </ImageContainer>
      </SectionLeft>

      <SectionRight>
        <h3>{sectwoH3}</h3>
        <h4>{sectwoH4}</h4>
        <p dangerouslySetInnerHTML={{ __html: sectwoP.replace(/(?:\r\n|\r|\n)/g, '<br/>') }} />

        <div dangerouslySetInnerHTML={{ __html: sectwoexpClosed.excerpt }}></div>

        <a href={sectwoexpOpen.url} title={sectwoexpOpen.title} target={sectwoexpOpen.target}></a>

        <p>
          <strong>{sectwoexpPStrong}</strong>
        </p>
        <p>{sectwoexpP}</p>

        <p>{sectwoexpH3}</p>
      </SectionRight>
    </Container>
  );
};

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const SectionLeft = styled('div')`
  flex-basis: 40%;
`;

const SectionRight = styled('div')`
  flex-basis: 60%;
`;

const ImageContainer = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    max-height: 400px;
    width: 100%;
  }
`;
