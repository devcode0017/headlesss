import { styled } from 'goober';
import Link from 'next/link';

import { getPostsForCategory } from '../../../lib/api';
import { formatDate } from '../../../utils/functions';

export default function Category({ category, posts }) {
  return (
    <div>
      <h1>category: {category}</h1>

      <PostsContainer>
        {(posts.length &&
          posts?.map(({ node }) => (
            <Link href={`/blog/${node.slug}`} key={node.slug}>
              <a>
                {node.featuredImage && <img src={node.featuredImage.node.sourceUrl} width='100%' alt='' />}
                <h3>{node.title}</h3>
                <p> {category}</p>
                <p>{formatDate(node.date)}</p>
              </a>
            </Link>
          ))) || <p>No posts found.</p>}
      </PostsContainer>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const data = await getPostsForCategory(params.categorySlug);

  return {
    props: {
      posts: data.length ? data : [],
      category: params.categorySlug
    }
  };
};

const PostsContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;

  a {
    text-decoration: none;
    color: black;
  }

  > div {
    width: min(100%, 400px);
  }

  img {
    max-width: 100%;
    max-height: 300px;
    object-fit: cover;
  }
`;
