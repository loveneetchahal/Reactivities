import React from 'react';
import {Button, Header, Icon, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name={'search'}/>
                Opps - we've looked everyhere but could not find what you are looking for!
            </Header>
            <Segment.Inline>
                <Button as={Link} to={'/activities'}>
                    Return to activities page
                </Button>
            </Segment.Inline>
        </Segment>
    );
};

export default NotFound;
