
import { NexGestLayout } from "../layout/NexGestLayout";
import { NothingSelectedView,NoteView } from "../views";


export const NexGestPage = () => {
  return (  

    <NexGestLayout>
        
      {/*<NothingSelectedView />*/}

      {<NoteView />}

    </NexGestLayout>
  );
};
