import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { LoaderIcon, Trash2Icon, ArrowLeftIcon, SaveIcon } from 'lucide-react';

function NoteDetail() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // ✅ Update note
  const handleSave = async () => {
    if (!note.title.trim()) {
      return toast.error("Title is required");
    }

    if (!note.content.trim()) {
      return toast.error("Content is required");
    }

    try {
      setSaving(true);
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Delete note
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this note?");
    if (!confirm) return;

    try {
      setSaving(true);
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost flex items-center gap-2">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Notes
          </Link>

          <button
            onClick={handleDelete}
            className="btn btn-error btn-outline flex items-center gap-2"
            disabled={saving}
          >
            {saving ? (
              <LoaderIcon className="animate-spin h-4 w-4" />
            ) : (
              <Trash2Icon className="h-5 w-5" />
            )}
            Delete
          </button>
        </div>

        <div className="card bg-base-100 shadow flex justify-center items-center ">
          <div className="card-body w-[90%]">
            {/* Title */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <br />
              <input
                type="text"
                className="input input-bordered w-full"
                value={note.title}
                onChange={(e) =>
                  setNote({ ...note, title: e.target.value })
                }
              />
            </div>

            {/* Content */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <br />
              <textarea
                className="textarea textarea-bordered min-h-[150px] w-full"
                value={note.content || ""}
                onChange={(e) =>
                  setNote({ ...note, content: e.target.value })
                }
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="btn btn-primary flex items-center gap-2"
              disabled={saving}
            >
              {saving ? (
                <LoaderIcon className="animate-spin h-4 w-4" />
              ) : (
                <SaveIcon className="h-5 w-5" />
              )}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetail;
