import {useEffect, useState} from "react";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [EditMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        agent.Activities.list()
            .then((response) => {
                response.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                })
                setActivities(response);
                setLoading(false);
            });
    }, []);

    const handleSelectActivity = (id: string) => {
        setEditMode(false);
        setSelectedActivity(activities.find(x => x.id === id));
    }
    const handleCancelSelectActivity = () => {
        setSelectedActivity(undefined);
    }

    const toggleEditMode = (id?: string) => {
        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(!EditMode);
    }

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
    if (loading) return <LoadingComponent content={'Loading app...'}/>
    return (
        <>
            <NavBar toggleEditMode={toggleEditMode}/>
            <Container style={{marginTop: "7em"}}>
                <ActivityDashboard deleteActivity={handleDeleteActivity} toggleEditMode={toggleEditMode}
                                   editMode={EditMode} activities={activities} selectedActivity={selectedActivity}
                                   selectActivity={handleSelectActivity}
                                   cancelSelectActivity={handleCancelSelectActivity}
                                   handleCreateOrEditActivity={handleCreateOrEditActivity}
                                   submitting={submitting}/>
            </Container>
        </>
    );
}

export default App;
