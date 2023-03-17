import React from "react";
import {Grid} from "semantic-ui-react";
import {Activity} from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";

interface Props {
    handleCreateOrEditActivity: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

const ActivityDashboard = ({submitting,deleteActivity,handleCreateOrEditActivity}: Props) => {
    const {activityStore} =useStore();
    const {selectedActivity,editMode,activities} = activityStore;
    return (
        <Grid>
            <Grid.Column width={"10"}>
                <ActivityList submitting={submitting} deleteActivity={deleteActivity} activities={activities} />
            </Grid.Column>
            <Grid.Column width={'6'}>
                {selectedActivity && !editMode && <ActivityDetails/>}
                {editMode && <ActivityForm submitting={submitting} handleCreateOrEditActivity={handleCreateOrEditActivity} />}
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDashboard);
