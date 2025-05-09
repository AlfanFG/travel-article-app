import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Register() {
  return (
    <Card>
      <CardHeader>Register</CardHeader>
      <CardContent>Form</CardContent>
      <CardFooter>
        <Button>Create an account</Button>
      </CardFooter>
    </Card>
  );
}
