import React, { useState } from 'react';
import { X, UploadCloud } from 'lucide-react';
import '../Styles/createPostModal.css';

export default function CreatePostModal({ isOpen, onClose, defaultDate, onSchedulePost }) {
  const [selectedPlatforms, setSelectedPlatforms] = useState(['Facebook']);
  const [postDate, setPostDate] = useState(defaultDate || '');
  const [postTime, setPostTime] = useState('12:00');
  const [status, setStatus] = useState('Scheduled');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState(['marketing', 'summercampaign', 'socialmedia']);
  const [tagInput, setTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null); // Ab yeh permanent Base64 store karega

  if (!isOpen) return null;

  const togglePlatform = (platformName) => {
    if (selectedPlatforms.includes(platformName)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platformName));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformName]);
    }
  };

  // Fixed File Change Handler with FileReader & Canvas Compression
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMediaFile(file);

    // Agar Video hai toh direct Data URL banayein (Note: Large videos may exceed 5MB localStorage limit)
    if (file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
      return;
    }

    // Image Compression using Canvas to safely store Base64 in localStorage
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 600; // Resize width for performance and small size
        const scaleFactor = MAX_WIDTH / img.width;

        if (scaleFactor < 1) {
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleFactor;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert image to optimized Base64 JPEG string
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        setMediaPreview(compressedBase64);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim().replace(/^#/, '');
    if (trimmed && !hashtags.includes(trimmed)) {
      setHashtags([...hashtags, trimmed]);
      setTagInput('');
      setShowTagInput(false);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setHashtags(hashtags.filter((tag) => tag !== tagToRemove));
  };

  const formatTime12Hour = (time24) => {
    if (!time24) return '12:00 PM';
    let [hours, minutes] = time24.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${String(minutes).padStart(2, '0')} ${ampm}`;
  };

  const getPlatformDetails = (platform) => {
    switch (platform) {
      case 'Facebook':
        return { color: '#0084ff', borderClass: 'fb-border' };
      case 'Instagram':
        return { color: '#e1306c', borderClass: 'insta-border' };
      case 'LinkedIn':
        return { color: '#0a66c2', borderClass: 'linkedin-border' };
      case 'Twitter':
        return { color: '#000000', borderClass: 'twitter-border' };
      case 'TikTok':
        return { color: '#000000', borderClass: 'tiktok-border' };
      default:
        return { color: '#ec4899', borderClass: 'default-border' };
    }
  };

  const handleSubmit = (customStatus) => {
    const finalStatus = customStatus || status;

    if (finalStatus !== 'Draft' && !postDate) {
      return alert('Please select a date.');
    }

    const formattedCaption = `${caption} ${hashtags.map((h) => `#${h}`).join(' ')}`.trim();
    const [y, m, d] = postDate ? postDate.split('-').map(Number) : [null, null, null];

    const newPosts = selectedPlatforms.map((platform, idx) => {
      const platformDetails = getPlatformDetails(platform);
      return {
        id: Date.now() + idx,
        day: d,
        month: m ? m - 1 : null,
        year: y,
        dateStr: postDate || new Date().toISOString().split('T')[0],
        time: formatTime12Hour(postTime),
        scheduledTime: formatTime12Hour(postTime),
        platform: platform,
        status: finalStatus,
        caption: formattedCaption || 'No caption provided.',
        color: platformDetails.color,
        borderClass: platformDetails.borderClass,
        // Ab `mediaPreview` mein persistent Base64 string hogi
        img: mediaPreview || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&auto=format&fit=crop&q=60',
        isVideo: mediaFile?.type.startsWith('video/') || false,
      };
    });

    onSchedulePost(newPosts);

    // Form cleanup
    setCaption('');
    setMediaPreview(null);
    setMediaFile(null);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="create-post-modal">
        <div className="modal-header">
          <h2>Create New Post</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} color="#64748b" />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">PLATFORMS</label>
            <div className="platform-pills">
              {['Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'TikTok'].map((platform) => {
                const isSelected = selectedPlatforms.includes(platform);
                return (
                  <button
                    key={platform}
                    type="button"
                    className={`platform-pill ${isSelected ? 'active' : ''}`}
                    onClick={() => togglePlatform(platform)}
                  >
                    <span className="pill-dot"></span>
                    {platform}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-row three-cols">
            <div className="form-group">
              <label className="form-label">DATE</label>
              <input
                type="date"
                className="modal-input"
                value={postDate}
                onChange={(e) => setPostDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">TIME</label>
              <input
                type="time"
                className="modal-input"
                value={postTime}
                onChange={(e) => setPostTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">STATUS</label>
              <select
                className="modal-input select-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="label-with-counter">
              <label className="form-label">CAPTION</label>
              <span className="char-counter">{caption.length} / 2,200</span>
            </div>
            <textarea
              className="caption-textarea"
              placeholder="Write your caption here..."
              maxLength={2200}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>

            <div className="tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              <span className="tag-hashtag">#</span>
              {hashtags.map((tag) => (
                <span key={tag} className="tag-pill" style={{ cursor: 'pointer' }} onClick={() => handleRemoveTag(tag)}>
                  #{tag} &times;
                </span>
              ))}

              {showTagInput ? (
                <input
                  type="text"
                  autoFocus
                  className="modal-input"
                  style={{ width: '110px', padding: '2px 8px', fontSize: '12px' }}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  onBlur={handleAddTag}
                  placeholder="tag name..."
                />
              ) : (
                <button type="button" className="add-tag-btn" onClick={() => setShowTagInput(true)}>
                  + Add Tag
                </button>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">MEDIA</label>
            <div className="drag-drop-area" style={{ position: 'relative', cursor: 'pointer' }}>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                }}
              />
              {mediaPreview ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px' }}>
                  {mediaFile?.type.startsWith('video/') ? (
                    <video src={mediaPreview} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                  ) : (
                    <img src={mediaPreview} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                  )}
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>{mediaFile?.name || 'Uploaded Media'}</p>
                    <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Click or drag to replace</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="upload-icon-circle">
                    <UploadCloud size={24} color="#94a3b8" />
                  </div>
                  <p className="drag-text">Drag & drop files here, or click to upload</p>
                  <p className="drag-subtext">Supports JPG, PNG, MP4 (Max 50MB)</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={() => handleSubmit('Draft')}>
            Save as Draft
          </button>
          <button type="button" className="btn-primary" onClick={() => handleSubmit(status)}>
            Schedule Post &#10148;
          </button>
        </div>
      </div>
    </div>
  );
}