import {useState} from "react";
import MeetingCard from "@components/meetingCard/MeetingCard";
import MeetingSchedule from "@components/meetingSchedule/MeetingSchedule";
import { useDispatch, useSelector } from 'react-redux';
import { NextPage } from "next";

const Meetings : NextPage = () =>{
    return (
        <>
            <MeetingSchedule/>
        </>
    );
};

export default Meetings;
