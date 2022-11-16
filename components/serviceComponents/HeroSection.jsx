import { styled } from 'goober';

export const HeroSection = ({ data }) => {
  const { h1 = '', herobg = '', heroh2 = '', herop = '' } = data;

  return (
    <Container bg={herobg.mediaItemUrl}>
      <h1>{h1}</h1>
      <h2>{heroh2}</h2>
      <p>{herop}</p>
    </Container>
  );
};

const Container = styled('div')`
  padding: 10rem 0;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${(props) => props.bg});
`;
