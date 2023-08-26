import React from "react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/uploader";

type Course = {
  id: number;
  name: string;
  files: string[];
  topics: string[];
};

const Profile: NextPage = (props) => {
  const { data: session } = useSession();
  const [courses, setCourses] = React.useState<Course[]>([]);

  const addDefaultCourse = () => {
    setCourses((prev) => [
      ...prev,
      {
        id: 0,
        name: "Default Course",
        files: [],
        topics: [],
      },
    ]);
  };

  return (
    <div className="flex flex-col items-start gap-2 p-20">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        Profile
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
        Welcome back {session?.user?.email}!
      </p>

      {courses.length > 0 ? (
        <Tabs defaultValue={courses[0]?.name} className="pt-30 w-full">
          <TabsList>
            {courses.map((course) => (
              <TabsTrigger value={course.name} key={course.id}>
                {course.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {courses.map((course) => (
            <TabsContent value={course.name} key={course.id}>
              <Card>
                <CardHeader>
                  <CardTitle>Course Metadata</CardTitle>
                  <CardDescription>
                    Update the course name and description.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Course Name</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">Course Description</Label>
                    <Textarea id="new" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">Documents</Label>
                    {course.files.map((file) => (
                      <div className="flex items-center justify-between gap-2">
                        <p>{file}</p>
                        <Button>Remove</Button>
                      </div>
                    ))}
                  </div>
                  <FileUploader />
                </CardContent>
                {/* <CardFooter>
                                            <Button>Save password</Button>
                                        </CardFooter> */}
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <p className="text-lg text-muted-foreground sm:text-xl">
            You have no courses yet.
          </p>
          <Button onClick={addDefaultCourse}>Create a course</Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
