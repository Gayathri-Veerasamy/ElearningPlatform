// src/component/useMultipleEditors.js

import { useEffect, useState } from "react";
import { useEditor as createEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

/**
 * Safe custom hook that manages multiple Tiptap editors.
 */
const useMultipleEditors = (contents, onContentChange) => {
  const [editors, setEditors] = useState([]);

  useEffect(() => {
    const newEditors = contents.map((content, index) =>
      createEditor({
        extensions: [StarterKit],
        content,
        onUpdate({ editor }) {
          const updatedContents = [...contents];
          updatedContents[index] = editor.getHTML();
          onContentChange(updatedContents);
        },
      })
    );

    setEditors(newEditors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contents.length]); // only re-run when number of sections changes

  return editors;
};

export default useMultipleEditors;
