import { useState } from "react";
import { MoreVertical } from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import RestartButton from "../RestartButton";

function DangerActions({
  handleRestart,
  handleUndo,
}: {
  handleRestart: () => void;
  handleUndo: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <DropdownMenu open={showMenu} onOpenChange={() => setShowMenu(!showMenu)}>
      <DropdownMenuTrigger asChild>
        <Button
          name="danger-actions"
          title="danger-actions"
          size="icon"
          variant="secondary"
        >
          <MoreVertical size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 space-y-2 p-4" align="end">
        <RestartButton
          onClick={handleRestart}
          handleCloseMenu={() => setShowMenu(false)}
        />
        <Button
          size="sm"
          variant="destructive"
          onClick={() => {
            setShowMenu(false);
            handleUndo();
          }}
        >
          Undo
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DangerActions;
