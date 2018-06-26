from app import app, User
import unittest


class UserCRUDTests(unittest.TestCase):
    """Testing suite for CRUD operations on users."""

    def setUp(self):
        """Before each test, create a test client instance."""

        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_create_user(self):
        """Send a post request, then assert that the correct user was created."""

        result = self.client.post(
            '/users',
            data={
                'fname': 'Sample',
                'lname': 'User'
            },
            follow_redirects=True)
        self.assertIn(b'Sample User', result.data)

    def test_read_user(self):
        """Get a user, then confirm that that user's name is rendered by the route."""

        u = User.query.first()
        result = self.client.get(f'/users/{u.id}')

        self.assertIn(f'{u.first_name} {u.last_name}'.encode('ASCII'),
                      result.data)

    def test_update_user(self):
        """Get a user, edit the first and last name, then confirm it was updated."""

        u = User.query.first()
        result = self.client.patch(
            f'/users/{u.id}',
            data={
                'fname': 'Foo',
                'lname': 'Bar'
            },
            follow_redirects=True)

        self.assertIn(b'Foo Bar', result.data)

    def test_delete_user(self):
        """Get a user, delete it, then confirm it was deleted on the rendered HTML."""

        u = User.query.first()
        result = self.client.delete(
            f'/users/{u.id}/delete', follow_redirects=True)

        self.assertNotIn(f'{u.first_name} {u.last_name}'.encode('ASCII'),
                         result.data)

    def test_message_not_found(self):
        """Test that a 404 is rendered when a bad user id is given."""

        request = self.client.get(f'/users/100000')

        self.assertEqual(request.status_code, 404)
        self.assertIn(b'Not Found', request.data)


if __name__ == '__main__':
    unittest.main()
