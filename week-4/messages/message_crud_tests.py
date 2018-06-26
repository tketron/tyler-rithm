from app import app, Message, User
import unittest


class MessagesCRUDTests(unittest.TestCase):
    """Testing suite for CRUD on messages."""

    def setUp(self):
        """Before each test, create a test client instance."""

        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_create_message(self):
        """Send data to the route to create a message, then assert it was created."""

        u = User.query.first()
        request = self.client.post(
            f'/users/{u.id}/message',
            data={'content': 'lorem ipsum dolor sit amet'},
            follow_redirects=True)

        self.assertIn(b'lorem ipsum dolor sit amet', request.data)

    def test_read_message(self):
        """Test that a single message is retrieved."""
        m = Message.query.first()
        request = self.client.get(f'/messages/{m.id}')

        self.assertIn(f'{m.content}'.encode('ASCII'), request.data)

    def test_update_message(self):
        """Test that a message can be updated from the proper route."""

        m = Message.query.first()
        request = self.client.patch(
            f'/messages/{m.id}',
            data={'content': 'foo bar baz'},
            follow_redirects=True)

        self.assertIn(b'foo bar baz', request.data)

    def test_destroy_message(self):
        """Test that a message can be deleted."""

        m = Message.query.first()
        request = self.client.delete(f'/messages/{m.id}/delete')

        self.assertNotIn(f'{m.content}'.encode('ASCII'), request.data)

    def test_message_not_found(self):
        """Test that a 404 is rendered when a bad message id is given."""

        request = self.client.get(f'/messages/100000')

        self.assertEqual(request.status_code, 404)
        self.assertIn(b'Not Found', request.data)


if __name__ == '__main__':
    unittest.main()
