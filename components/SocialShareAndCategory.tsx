import { styled } from 'goober';
import Link from 'next/link';
import { GrFacebookOption, GrTwitter, GrLinkedinOption } from 'react-icons/gr';
import { AiOutlineLink } from 'react-icons/ai';

interface Props {
  categories: string[];
  slug: string;
}

export const SocialShareAndCategory = ({ categories, slug }: Props) => {
  const shareUrl = `https://www.example.com/${slug}`;

  return (
    <Container>
      <SocialShareContainer>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target='_blank' rel='noopener noreferrer' title='share on facebook'>
          <GrFacebookOption color='black' />
        </a>
        <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target='_blank' rel='noopener noreferrer' title='share on twitter'>
          <GrTwitter color='black' />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target='_blank'
          rel='noopener noreferrer'
          title='share on linkedin'
        >
          <GrLinkedinOption color='black' />
        </a>

        {/* a button to copy the url to clipboard */}

        <span
          onClick={() => {
            navigator.clipboard.writeText(shareUrl);

            alert('Link Copied to clipboard');
          }}
        >
          <AiOutlineLink color='black' />
        </span>
      </SocialShareContainer>

      <CategoryContainer>
        <p>category: </p>
        {categories?.length &&
          categories.map((category, index) => (
            <span key={category}>
              <Link href={`/blog/category/${category}`} key={category}>
                <a>{category}</a>
              </Link>
              {index < categories.length - 1 && ', '}
            </span>
          ))}
      </CategoryContainer>
    </Container>
  );
};

const Container = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;

  * {
    margin: 0;
  }
`;
const CategoryContainer = styled('div')`
  display: flex;
  align-items: center;

  p {
    margin: 0;
  }

  span {
    margin-left: 5px;
  }

  a,
  span {
    display: inline-block;
  }
`;

const SocialShareContainer = styled('div')`
  a,
  span {
    margin-right: 10px;
    display: inline-block;
    font-size: 25px;

    & > * {
      pointer-events: none;
    }
  }
`;
