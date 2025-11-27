import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Logo } from '../icons/logo';

interface TestHeaderProps {
  testTitle: string;
}

export function TestHeader({ testTitle }: TestHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6 shrink-0">
      <div className="flex items-center gap-4">
        <Logo className="h-6" />
        <h1 className="text-lg font-semibold hidden sm:block">{testTitle}</h1>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Submit Test</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. You will not be able to change your answers after submitting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
