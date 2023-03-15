import {useEffect, useState} from "react";
import axios from "axios";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [EditMode, setEditMode] = useState(false);

    useEffect(() => {
        axios
            .get<Activity[]>("http://localhost:5000/api/activities")
            .then((response) => {
                setActivities(response.data);
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
        activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) : setActivities([...activities, {...activity, id: uuid()}]);
        setEditMode(false);
        setSelectedActivity(activity);
    }
    const handleDeleteActivity = (id: string) => {
        setActivities([...activities.filter(x => x.id !== id)]);
    }
    return (
        <>
            <NavBar toggleEditMode={toggleEditMode}/>
            <Container style={{marginTop: "7em"}}>
                <ActivityDashboard deleteActivity={handleDeleteActivity} toggleEditMode={toggleEditMode} editMode={EditMode} activities={activities} selectedActivity={selectedActivity} selectActivity={handleSelectActivity} cancelSelectActivity = {handleCancelSelectActivity} handleCreateOrEditActivity={handleCreateOrEditActivity}/>
            </Container>
        </>
    );
}

export default App;
