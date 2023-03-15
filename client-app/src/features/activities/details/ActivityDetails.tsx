import React from 'react';
import {Image, Card, Button} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity";

interface Props{
    activity: Activity
    cancelSelectActivity: () => void;
    toggleEditMode: (id:string) => void;
}
const ActivityDetails = ({toggleEditMode,activity,cancelSelectActivity}: Props) => (
    <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
        <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
                <span>{activity.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity.description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths={2}>
                <Button onClick={() => toggleEditMode(activity.id)} basic color={'blue'} content={'Edit'}/>
                <Button onClick={() => cancelSelectActivity()} basic color={'grey'} content={'Cancel'}/>
            </Button.Group>
        </Card.Content>
    </Card>
);

export default ActivityDetails;