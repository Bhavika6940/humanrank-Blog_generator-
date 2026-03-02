import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Layout from "../../Layout/Layout";
import "./Editor.css";
import Swal from "sweetalert2";

const BlogEditor = () => {
  // 1. Define the missing state
  const [content, setContent] = useState("");

  const handleSave = async () => {
    if (!content.trim()){
      alert("Content is required!");
      return ;
    }


    // Force a white background and stamdard text color for the clipboard
    const cleanHtml = `
    <div style="background-color: #ffffff; color: #000000; font-family: Arial, sans-serif; padding: 10px;">
      ${content}
    </div> 
    `

    try {
      if (navigator.clipboard && window.ClipboardItem){
        const type = "text/html";
        const blob = new Blob([cleanHtml], {type});
        const data = [
          new ClipboardItem({
            [type] : blob,
            "text/plain" : new Blob([content.replace(/<[^>]*>/g, "")], { type : "text/plain"}),
          }),
        ];
        await navigator.clipboard.write(data);
      }
      else{
        const container = document.createElement("div");
        container.innerHTML = cleanHtml;
        container.style.position = "fixed";
        container.style.left = "-9999px";
        document.body.appendChild(container);

        const range = document.createRange();
        range.selectNode(container);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        document.execCommand("copy");

        window.getSelection().removeAllRanges();
        document.body.removeChild(container);
      }

      Swal.fire({
        icon: 'success',
        text: 'Content saved to clipboard with fomatting.',
        timer : 2000,
        showConfirmButton : false
      });
      
    }
    catch(err){
      console.error("Clipboard copy failed:", err);
      Swal.fire({
        icon : 'warning',
        title : 'Copy Failed',
        text : 'Something went wrong while copying.'
      })
    }
  };

  // The return is now properly inside the BlogEditor function
  return (
    <Layout>
      <div className="editor-page-container">
        <div className="editor-card">
          <h2 className="editor-title">Blog Editor</h2>

          <Editor
            apiKey="ynhmmlht7lkdu4a8wgbau11188pwz1aljiuve655hqgsk9np"
            initialValue="<p>Do editing here.</p>"
            onEditorChange={(newContent) => setContent(newContent)}
            init={{
              height: 500,
              menubar: false,
              branding: false,
              plugins: [
                "anchor", "autolink", "charmap", "codesample", "emoticons", "link", "lists", "media", "searchreplace", "table", "visualblocks", "wordcount",
                "checklist", "mediaembed", "casechange", "formatpainter", "pageembed", "a11ychecker", "tinymcespellchecker", "permanentpen", "powerpaste", "advtable", "advcode", "advtemplate", "uploadcare", "mentions", "tableofcontents", "footnotes", "mergetags", "autocorrect", "typography", "inlinecss", "markdown", "importword", "exportword", "exportpdf",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          <button onClick={handleSave} className="save-btn">
            SAVE CONTENT
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default BlogEditor;