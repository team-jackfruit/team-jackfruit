import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/userData/userData';
import UserCard from '../components/UserCard';
import FavoriteCard from '../components/FavoriteCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Favorite } from '../../api/favData/favData';

/* Renders a table containing all of the User documents. Use <UserItem> to render each row. */
const UserProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, users, users2, ready2 } = useTracker(() => {
    const subscription = Meteor.subscribe(Users.userPublicationName);
    const subscription2 = Meteor.subscribe(Favorite.userPublicationName);
    const rdy = subscription.ready();
    const rdy2 = subscription2.ready();
    const userItems = Users.collection.find({}).fetch();
    const favItems = Favorite.collection.find({}).fetch();

    // Logging statements
    console.log('Subscription ready:', rdy);
    console.log('Fetched users:', userItems);

    return {
      users: userItems,
      users2: favItems,
      ready: rdy,
      ready2: rdy2,
    };
  }, []);

  return (ready || ready2) ? (
    <Container fluid className="py-3 userProfile">
      <Row className="justify-content-center">
        <Col md={4}>
          <Image src="/images/UserAccount.png" fluid />
        </Col>
        {users.map((user) => (
          <Col md={4} key={user._id} className="mb-4">
            <UserCard user={user} />
          </Col>
        ))}
        {users2.map((user) => (
          <Col md={4} key={user._id} className="mb-4">
            <FavoriteCard user={user} />
          </Col>
        ))}

      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default UserProfile;
