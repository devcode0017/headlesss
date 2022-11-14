import { styled } from 'goober';

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

export const CustomSection = ({ sectionData }: Props) => {
  return (
    <Container bgImage={sectionData.bg.mediaItemUrl}>
      <Content>
        <h1>{sectionData.h1}</h1>
        <h6>{sectionData.h6}</h6>
        <p>{sectionData.p}</p>
      </Content>
    </Container>
  );
};

const Container = styled<any>('div')`
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${(props) => props.bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 200px 100px;
`;

const Content = styled('div')`
  p {
    margin-top: 40px;
    max-width: 80ch;
  }
`;
