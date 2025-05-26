import { sampleFolders } from "../data/Sample";
import { Button } from "react-bootstrap";
import "./FolderMenu.css";

interface Props {
  selectedId: string;
  setSelectedId: (id: string) => void;
  folders: typeof sampleFolders;
  setFolders: React.Dispatch<React.SetStateAction<typeof sampleFolders>>;
}

const FolderMenu = ({ selectedId, setSelectedId, folders, setFolders }: Props) => {
  return (
    <div className="folder-scroll-row">
      <div className="folder-scroll-left w-100">
        {folders.map((folder) => (
          <Button
            key={folder.id}
            variant={selectedId === folder.id ? "primary" : "outline-secondary"}
            onClick={() => setSelectedId(folder.id)}
            className="folder-btn"
          >
            {folder.name}
          </Button>
        ))}
        <Button variant="secondary">추가</Button>
        <Button variant="secondary">삭제</Button>
      </div>
    </div>
  );
};

export default FolderMenu;