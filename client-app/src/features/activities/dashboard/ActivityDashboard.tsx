import React, {useEffect} from "react";
import {Grid} from "semantic-ui-react";
import ActivityList from './ActivityList';
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";
import { router } from "../../../app/router/Routes";
import { toast } from "react-toastify";


const ActivityDashboard = () => {
    const {activityStore, commonStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    useEffect(() => {
        if(activityRegistry.size <= 1 && commonStore.token !== null){
             void loadActivities();
        } else {
            console.log(activityRegistry);
            
            toast.error("You're not signed in")
            router.navigate('/login');
        }
    }, [activityRegistry, commonStore, loadActivities]);

    if (activityStore.loadingInitial) return <LoadingComponent content={'Loading app...'}/>
    return (
        <Grid>
            <Grid.Column width={"10"}>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width={'6'}>
                <ActivityFilters/>
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDashboard);
