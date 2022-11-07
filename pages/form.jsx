import getGravityForm from '../utils/gravity-forms';
import GravityForm from '../components/GravityForm';

export default function Form({ form }) {
  const { title, description } = form;

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>

      <GravityForm form={form} />
    </div>
  );
}

export async function getServerSideProps() {
  const form = await getGravityForm(1);
  return {
    props: {
      form
    }
  };
}
