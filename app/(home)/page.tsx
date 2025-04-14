import Banner from "@/components/home/Banner";
import WhyCourse from "@/components/home/WhyCourse";
import CourseOutline from "@/components/home/CourseOutline";
import CourseStory from "@/components/home/CourseStory";
import ClassDescription from "@/components/home/ClassDescription";
import TotalClass from "@/components/home/TotalClass";
import ClassRoutine from "@/components/home/ClassRoutine";
import CourseFeatures from "@/components/home/CourseFeatures";
import ComparisonTable from "@/components/home/ComparisonTable";
import Instructors from "@/components/home/Instructors";
import React from "react";

export default async function Home() {
  return (
    <main>
      <Banner />
      <WhyCourse />
      <CourseOutline />
      <CourseStory />
      <ClassDescription />
      <TotalClass />
      <ClassRoutine />
      <CourseFeatures />
      <ComparisonTable />
      <Instructors />
    </main>
  );
}
