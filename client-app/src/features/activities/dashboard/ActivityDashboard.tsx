import React from "react";
import {Button, Grid} from "semantic-ui-react";
import {Activity} from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    toggleEditMode: () => void;
    handleCreateOrEditActivity: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

const ActivityDashboard = ({submitting,deleteActivity,handleCreateOrEditActivity,toggleEditMode,editMode,activities,selectedActivity,selectActivity, cancelSelectActivity}: Props) => {
    return (
        <Grid>
            <Grid.Column width={"10"}>
                <Button onClick={() => console.log(selectedActivity)}>Hey</Button>
                <ActivityList submitting={submitting} deleteActivity={deleteActivity} activities={activities} selectActivity={selectActivity} />
            </Grid.Column>
            <Grid.Column width={'6'}>
                {selectedActivity && !editMode && <ActivityDetails toggleEditMode={toggleEditMode} cancelSelectActivity={cancelSelectActivity} activity={selectedActivity}/>}
                {editMode && <ActivityForm submitting={submitting} handleCreateOrEditActivity={handleCreateOrEditActivity} activity={selectedActivity} toggleEditMode={toggleEditMode}/>}
            </Grid.Column>
        </Grid>
    );
};

export default ActivityDashboard;
