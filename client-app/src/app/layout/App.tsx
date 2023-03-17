import {useEffect, useState} from "react";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import {observer} from "mobx-react-lite";
import {useStore} from "../stores/store";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [EditMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const {activityStore} = useStore();

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);


    const handleCreateOrEditActivity = (activity: Activity) => {
        setSubmitting(true);
        if (activity.id) {
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity])
                setSubmitting(false);
                setEditMode(false);
                setSelectedActivity(activity)
            })
        } else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, {
                    ...activity,
                    id: uuid()
                }]);
                setSubmitting(false);
                setEditMode(false);
                setSelectedActivity(activity)
            })
        }

        // activity.id
        //     ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
        //     : setActivities([...activities, {
        //         ...activity,
        //         id: uuid()
        //     }]);
        // setEditMode(false);
        // setSelectedActivity(activity);
    }
    const handleDeleteActivity = (id: string) => {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]);
            setSubmitting(false);
        });
    }
    if (activityStore.loadingInitial) return <LoadingComponent content={'Loading app...'}/>
    return (
        <>
            <NavBar/>
            <Container style={{marginTop: "7em"}}>
                <ActivityDashboard deleteActivity={handleDeleteActivity}
                                   handleCreateOrEditActivity={handleCreateOrEditActivity}
                                   submitting={submitting}/>
            </Container>
        </>
    );
}

export default observer(App);
