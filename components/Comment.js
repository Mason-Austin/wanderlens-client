import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

function Comment({
  content, isUserComment, onEdit, onDelete,
}) {
  return (
    <Card style={{ marginBottom: '10px' }}>
      <Card.Body>
        <Card.Text>
          {isUserComment ? 'My comment:' : "Someone else's comment: "}
          {content}
        </Card.Text>
        {isUserComment && (
          <div>
            <Button variant="outline-primary" size="sm" onClick={onEdit}>Edit</Button>
            <Button variant="outline-danger" size="sm" onClick={onDelete} style={{ marginLeft: '5px' }}>Delete</Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  isUserComment: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Comment;
