import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from 'lucide-react';

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
        console.log(res.data);
      } catch (error) {
        console.log("Error in fetching data", error);
        toast.error("Failed to fetch the notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = () => {};

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
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
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteDetail;
