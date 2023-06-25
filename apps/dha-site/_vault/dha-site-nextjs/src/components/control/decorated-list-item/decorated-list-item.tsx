interface Props {
  label: string;
  description: string;
}

const DecoratedListItem = ({ label, description }: Props): JSX.Element => {
  return (
    <li>
      <p>
        <b>{label}:</b>
        <br />
        <span style={{ color: 'white' }}>
          {description ? description : '(none)'}
        </span>
      </p>
    </li>
  );
};

export default DecoratedListItem;
