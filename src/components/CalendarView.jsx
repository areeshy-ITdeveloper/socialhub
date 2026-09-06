import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  Calendar as CalendarIcon, 
  X,
  FileText
} from 'lucide-react';
import CreatePostModal from './CreatePostModal';
import '../Styles/calendar.css';

const FacebookIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ffffff' }}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ffffff' }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ffffff' }}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ffffff' }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ffffff' }}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.29-2.68.73-5.38 2.68-7.18 1.48-1.38 3.52-2.12 5.54-2.02v4.03c-1.13-.07-2.28.32-3.13 1.07-.94.8-1.41 2.05-1.27 3.28.11 1.15.82 2.18 1.86 2.68.99.49 2.18.42 3.12-.13.88-.5 1.44-1.42 1.53-2.43.06-2.52.03-5.04.03-7.56V.02z"/>
  </svg>
);

const defaultInitialPosts = [];

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('Month');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Drafts States
  const [draftPosts, setDraftPosts] = useState([]);
  const [isDraftsModalOpen, setIsDraftsModalOpen] = useState(false);

  // Detail & Edit Modal State
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  // Popover for "+X More"
  const [popupDateData, setPopupDateData] = useState({ isOpen: false, day: null, posts: [] });

  // Drag & Drop highlight state (which date cell/column is currently being hovered over while dragging)
  const [dragOverDate, setDragOverDate] = useState(null);
  const [draggingPostId, setDraggingPostId] = useState(null);

  // Delete Draft Handler
  const handleDeleteDraft = (id) => {
    if (window.confirm('Are you sure you want to delete this draft?')) {
      setDraftPosts(prev => prev.filter(draft => draft.id !== id));
    }
  };

  // Publish / Schedule Draft to Calendar
  const handlePublishDraftToCalendar = (draft, targetStatus = 'Scheduled') => {
    const dateObj = new Date(draft.dateStr || Date.now());
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const meta = getPlatformMeta(draft.platform);

    const publishedPost = {
      ...draft,
      status: targetStatus,
      day,
      month,
      year,
      time: draft.time || '12:00 PM',
      color: meta.color,
      borderClass: meta.borderClass
    };

    setDraftPosts(prev => prev.filter(d => d.id !== draft.id));
    setPosts(prev => [publishedPost, ...prev]);
    setIsDraftsModalOpen(false);
  };

  // LOCAL STORAGE LOAD & SAVE logic
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('calendar_social_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading posts from localStorage:', e);
      }
    }
    return defaultInitialPosts;
  });

  useEffect(() => {
    localStorage.setItem('calendar_social_posts', JSON.stringify(posts));
  }, [posts]);

  // Helper function to check if media is video
  const checkIsVideo = (post) => {
    if (post?.isVideo !== undefined) return post.isVideo;
    const media = post?.img || post?.video || post?.media || '';
    return typeof media === 'string' && (
      media.startsWith('data:video/') || 
      /\.(mp4|webm|ogg|mov)$/i.test(media)
    );
  };

  // Helper function to get border class & color according to Platform
  const getPlatformMeta = (platform) => {
    switch (platform) {
      case 'Facebook':
        return { color: '#0084ff', borderClass: 'fb-border' };
      case 'Instagram':
        return { color: '#e1306c', borderClass: 'insta-border' };
      case 'LinkedIn':
        return { color: '#0077b5', borderClass: 'linkedin-border' };
      case 'Twitter':
        return { color: '#1da1f2', borderClass: 'twitter-border' };
      case 'TikTok':
        return { color: '#000000', borderClass: 'tiktok-border' };
      default:
        return { color: '#7c3aed', borderClass: 'default-border' };
    }
  };

  // Helper: build a "YYYY-MM-DD" string from year/month(0-indexed)/day
  const buildDateStr = (y, m, d) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const handleAddPosts = (newPostsArray) => {
    if (!newPostsArray) return;
    const formattedArray = Array.isArray(newPostsArray) ? newPostsArray : [newPostsArray];
    
    const draftsOnly = [];
    const calendarOnly = [];

    formattedArray.forEach(p => {
      const meta = getPlatformMeta(p.platform);
      const postObj = {
        id: p.id || Date.now().toString() + Math.random().toString().slice(2, 5),
        color: meta.color,
        borderClass: meta.borderClass,
        ...p
      };

      if (p.status === 'Draft') {
        draftsOnly.push(postObj);
      } else {
        calendarOnly.push(postObj);
      }
    });

    if (draftsOnly.length > 0) {
      setDraftPosts((prev) => [...draftsOnly, ...prev]);
    }
    if (calendarOnly.length > 0) {
      setPosts((prev) => [...calendarOnly, ...prev]);
    }
  };

  // Open Post Details Modal
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsEditing(false);
    setEditFormData({ ...post });
  };

  // Delete Post Action
  const handleDeletePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    setSelectedPost(null);
    setPopupDateData({ isOpen: false, day: null, posts: [] });
  };

  // Save Edit Post Action
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editFormData) return;

    const dateObj = new Date(editFormData.dateStr);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const meta = getPlatformMeta(editFormData.platform);

    const updatedPost = {
      ...editFormData,
      day,
      month,
      year,
      color: meta.color,
      borderClass: meta.borderClass
    };

    if (updatedPost.status === 'Draft') {
      setPosts((prev) => prev.filter((p) => p.id !== updatedPost.id));
      setDraftPosts((prev) => [updatedPost, ...prev]);
    } else {
      setPosts((prev) => prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    }

    setSelectedPost(null);
    setIsEditing(false);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const dayDate = currentDate.getDate();

  const formattedInputDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayDate).padStart(2, '0')}`;

  const filteredPosts = posts.filter(
    (p) => (platformFilter === 'All' || p.platform === platformFilter) && p.status !== 'Draft'
  );

  const handleNavigate = (direction) => {
    const d = new Date(currentDate);
    const step = direction === 'prev' ? -1 : 1;

    if (selectedView === 'Day') {
      d.setDate(d.getDate() + step);
    } else if (selectedView === 'Week') {
      d.setDate(d.getDate() + step * 7);
    } else {
      d.setMonth(d.getMonth() + step);
    }
    setCurrentDate(d);
  };

  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const startOfWeek = getStartOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  const renderDateLabel = () => {
    if (selectedView === 'Day') {
      return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
    if (selectedView === 'Week') {
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      const startMonth = startOfWeek.toLocaleDateString('en-US', { month: 'short' });
      const endMonth = endOfWeek.toLocaleDateString('en-US', { month: 'short' });
      return `${startMonth} ${startOfWeek.getDate()} - ${startMonth !== endMonth ? endMonth + ' ' : ''}${endOfWeek.getDate()}, ${endOfWeek.getFullYear()}`;
    }
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const renderPlatformIcon = (platform) => {
    switch (platform) {
      case 'Facebook':
        return <FacebookIcon />;
      case 'Instagram':
        return <InstagramIcon />;
      case 'LinkedIn':
        return <LinkedinIcon />;
      case 'Twitter':
        return <TwitterIcon />;
      case 'TikTok':
        return <TikTokIcon />;
      default:
        return <Clock size={13} color="#ffffff" />;
    }
  };

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const emptyCells = Array.from({ length: (firstDayIndex + 6) % 7 });
  const daysArray = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);

  const todayObj = new Date();

  // ---------------- DRAG & DROP HANDLERS ----------------

  // Fired when user starts dragging a post card
  const handleDragStart = (e, post) => {
    e.stopPropagation();
    e.dataTransfer.setData(
      'text/plain',
      JSON.stringify({ postId: post.id, sourceDate: post.dateStr })
    );
    e.dataTransfer.effectAllowed = 'move';
    setDraggingPostId(post.id);
  };

  // Fired continuously while dragging over a valid drop target
  const handleDragOver = (e, targetDateStr) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (targetDateStr && dragOverDate !== targetDateStr) {
      setDragOverDate(targetDateStr);
    }
  };

  // Fired when the dragged item leaves a drop target
  const handleDragLeave = (targetDateStr) => {
    setDragOverDate((prev) => (prev === targetDateStr ? null : prev));
  };

  // Fired when item is dropped onto a target date cell/column
  const handleDrop = (e, targetDateStr) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    setDragOverDate(null);
    setDraggingPostId(null);
    if (!data) return;

    try {
      const { postId, sourceDate } = JSON.parse(data);
      if (sourceDate === targetDateStr) return; // Dropped on same day, nothing to do

      const [ty, tm, td] = targetDateStr.split('-').map(Number);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                dateStr: targetDateStr,
                day: td,
                month: tm - 1,
                year: ty
              }
            : post
        )
      );
    } catch (err) {
      console.error('Drag and drop error:', err);
    }
  };

  const handleDragEnd = () => {
    setDragOverDate(null);
    setDraggingPostId(null);
  };

  return (
    <div className="calendar-container">
      {/* Controls Toolbar */}
      <div className="calendar-toolbar">
        <div className="toolbar-left">
          <button className="nav-arrow" onClick={() => handleNavigate('prev')}><ChevronLeft size={18} /></button>
          <button className="today-btn" onClick={() => setCurrentDate(new Date())}>Today</button>
          <button className="nav-arrow" onClick={() => handleNavigate('next')}><ChevronRight size={18} /></button>

          <div className="date-picker-trigger">
            <CalendarIcon size={18} color="#ec4899" />
            <span>{renderDateLabel()}</span>
          </div>
        </div>

        <div className="toolbar-right">
          <select className="platform-select" value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}>
            <option value="All">All Platforms</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Twitter">Twitter</option>
            <option value="TikTok">TikTok</option>
          </select>
          
          <div className="action-buttons-group" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              className="draft-posts-btn" 
              onClick={() => setIsDraftsModalOpen(true)}
              title="View Saved Drafts"
            >
              <FileText size={18} color="#6b21a8" />
              <span>Drafts</span>
              {draftPosts.length > 0 && (
                <span className="draft-badge">{draftPosts.length}</span>
              )}
            </button>
            <button className="add-post-btn" onClick={() => setIsModalOpen(true)}>
              <Plus size={20} color="#ffffff" />
            </button>
          </div>

          <div className="view-toggle">
            <button className={`view-btn ${selectedView === 'Day' ? 'active' : ''}`} onClick={() => setSelectedView('Day')}>Day</button>
            <button className={`view-btn ${selectedView === 'Month' ? 'active' : ''}`} onClick={() => setSelectedView('Month')}>Month</button>
            <button className={`view-btn ${selectedView === 'Week' ? 'active' : ''}`} onClick={() => setSelectedView('Week')}>Week</button>
          </div>
        </div>
      </div>

      {/* DAY VIEW */}
      {selectedView === 'Day' && (
        <div className="day-view-container">
          <div className="day-card-wrapper">
            <div className="day-posts-list">
              {filteredPosts.filter((p) => p.dateStr === formattedInputDate).length > 0 ? (
                filteredPosts
                  .filter((p) => p.dateStr === formattedInputDate)
                  .map((post) => {
                    const meta = getPlatformMeta(post.platform);
                    const mediaSrc = post.img || post.video || post.media;
                    const isVideo = checkIsVideo(post);

                    return (
                      <div 
                        key={post.id} 
                        className={`day-post-card ${meta.borderClass}`}
                        onClick={() => handlePostClick(post)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="card-top-bar">
                          <span className="post-time-text">{post.platform} • {post.time}</span>
                          <span className="status-badge"><Clock size={12} /> {post.status}</span>
                        </div>
                        <div className="card-body">
                          {mediaSrc && (
                            isVideo ? (
                              <video src={mediaSrc} controls className="post-thumbnail" />
                            ) : (
                              <img src={mediaSrc} alt="Post preview" className="post-thumbnail" />
                            )
                          )}
                          <p className="post-caption">{post.caption}</p>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="no-posts-view">No posts scheduled for this date.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WEEK VIEW */}
      {selectedView === 'Week' && (
        <div className="week-view-container">
          <div className="week-columns-grid">
            {weekDays.map((dateObj, idx) => {
              const formattedColDate = buildDateStr(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
              const colPosts = filteredPosts.filter((p) => p.dateStr === formattedColDate);
              const isDragTarget = dragOverDate === formattedColDate;

              return (
                <div 
                  key={idx} 
                  className="week-column"
                  onDragOver={(e) => handleDragOver(e, formattedColDate)}
                  onDragLeave={() => handleDragLeave(formattedColDate)}
                  onDrop={(e) => handleDrop(e, formattedColDate)}
                  style={isDragTarget ? { backgroundColor: 'rgba(236, 72, 153, 0.08)', outline: '2px dashed #ec4899', outlineOffset: '-2px' } : undefined}
                >
                  <div className="week-column-header">
                    <span className="week-day-name">
                      {dateObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                    </span>
                    <span className="week-day-num">{dateObj.getDate()}</span>
                  </div>
                  
                  <div className="week-column-body">
                    {colPosts.slice(0, 3).map((post) => {
                      const mediaSrc = post.img || post.video || post.media;
                      const isVideo = checkIsVideo(post);

                      return (
                        <div 
                          key={post.id} 
                          className="week-post-card"
                          draggable
                          onDragStart={(e) => handleDragStart(e, post)}
                          onDragEnd={handleDragEnd}
                          onClick={() => handlePostClick(post)}
                          style={{ 
                            cursor: 'grab', 
                            opacity: draggingPostId === post.id ? 0.4 : 1 
                          }}
                        >
                          <div className="week-post-header">
                            <span className={`platform-indicator ${post.platform ? post.platform.toLowerCase() : ''}`}></span>
                            <span className="week-post-time">{post.time}</span>
                          </div>

                          <p className="week-post-text">{post.caption}</p>
                          
                          {mediaSrc && (
                            isVideo ? (
                              <video src={mediaSrc} controls className="week-post-media" />
                            ) : (
                              <img src={mediaSrc} alt="Preview" className="week-post-media" />
                            )
                          )}

                          <div className={`status-badge ${post.status ? post.status.toLowerCase() : ''}`}>
                            {post.status === 'Published' ? '✓ Published' : '⏱ Scheduled'}
                          </div>
                        </div>
                      );
                    })}

                    {colPosts.length > 3 && (
                      <div 
                        className="more-posts-link" 
                        onClick={() => setPopupDateData({ isOpen: true, day: dateObj.getDate(), posts: colPosts })}
                      >
                        +{colPosts.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MONTH VIEW */}
      {selectedView === 'Month' && (
        <div className="calendar-grid-scroll">
          <div className="calendar-month-grid">
            {emptyCells.map((_, index) => (
              <div key={`empty-${index}`} className="grid-cell empty"></div>
            ))}
            {daysArray.map((day) => {
              const cellPosts = filteredPosts.filter(
                (p) => p.day === day && p.month === month && p.year === year
              );

              const isToday = 
                day === todayObj.getDate() && 
                month === todayObj.getMonth() && 
                year === todayObj.getFullYear();

              const cellDateStr = buildDateStr(year, month, day);
              const isDragTarget = dragOverDate === cellDateStr;

              return (
                <div 
                  key={day} 
                  className={`grid-cell ${isToday ? 'today-highlight' : ''}`}
                  onDragOver={(e) => handleDragOver(e, cellDateStr)}
                  onDragLeave={() => handleDragLeave(cellDateStr)}
                  onDrop={(e) => handleDrop(e, cellDateStr)}
                  style={isDragTarget ? { backgroundColor: 'rgba(236, 72, 153, 0.08)', outline: '2px dashed #ec4899', outlineOffset: '-2px' } : undefined}
                >
                  <span className="cell-day-num">{day}</span>
                  <div className="cell-posts">
                    {cellPosts.slice(0, 2).map((post) => {
                      const meta = getPlatformMeta(post.platform);
                      return (
                        <div 
                          key={post.id} 
                          className="custom-post-badge-pill" 
                          draggable
                          onDragStart={(e) => handleDragStart(e, post)}
                          onDragEnd={handleDragEnd}
                          style={{ 
                            backgroundColor: meta.color, 
                            cursor: 'grab',
                            opacity: draggingPostId === post.id ? 0.4 : 1 
                          }}
                          onClick={() => handlePostClick(post)}
                        >
                          <span className="badge-icon-box">
                            {renderPlatformIcon(post.platform)}
                          </span>
                          <span className="badge-time-text">{post.time}</span>
                          <span className="badge-status-box">
                            <Clock size={11} color="#ffffff" />
                          </span>
                        </div>
                      );
                    })}
                    {cellPosts.length > 2 && (
                      <div 
                        className="more-posts-text-btn" 
                        onClick={() => setPopupDateData({ isOpen: true, day: day, posts: cellPosts })}
                      >
                        +{cellPosts.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CREATE POST MODAL */}
      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultDate={formattedInputDate} 
        onSchedulePost={handleAddPosts} 
      />

      {/* DRAFTS MODAL */}
      {isDraftsModalOpen && (
        <div className="modal-overlay" onClick={() => setIsDraftsModalOpen(false)}>
          <div className="posts-popup-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', width: '90%' }}>
            <div className="popup-header">
              <h3>Saved Drafts ({draftPosts.length})</h3>
              <button className="popup-close-btn" onClick={() => setIsDraftsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="popup-body-list" style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
              {draftPosts.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>No drafts saved yet.</p>
              ) : (
                draftPosts.map((draft) => {
                  const meta = getPlatformMeta(draft.platform);
                  return (
                    <div key={draft.id} className="popup-post-item" style={{ borderLeft: `4px solid ${meta.color}`, marginBottom: '12px' }}>
                      <div className="popup-post-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="popup-platform-tag" style={{ color: meta.color, fontWeight: 'bold' }}>
                          {renderPlatformIcon(draft.platform)} {draft.platform}
                        </span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            type="button" 
                            style={{ background: '#ec4899', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer' }}
                            onClick={() => handlePublishDraftToCalendar(draft, 'Scheduled')}
                          >
                            Schedule
                          </button>
                          <button 
                            type="button" 
                            style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer' }}
                            onClick={() => handleDeleteDraft(draft.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="popup-caption-text" style={{ margin: '8px 0', fontSize: '13px' }}>{draft.caption}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL FOR "+X MORE" */}
      {popupDateData.isOpen && (
        <div 
          className="modal-overlay" 
          onClick={() => setPopupDateData({ isOpen: false, day: null, posts: [] })}
        >
          <div className="posts-popup-card" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>Scheduled Posts (Day {popupDateData.day})</h3>
              <button 
                className="popup-close-btn" 
                onClick={() => setPopupDateData({ isOpen: false, day: null, posts: [] })}
              >
                <X size={18} />
              </button>
            </div>
            <div className="popup-body-list">
              {popupDateData.posts.map((post) => {
                const meta = getPlatformMeta(post.platform);
                return (
                  <div 
                    key={post.id} 
                    className="popup-post-item" 
                    style={{ borderLeft: `4px solid ${meta.color}`, cursor: 'pointer' }}
                    onClick={() => {
                      setPopupDateData({ isOpen: false, day: null, posts: [] });
                      handlePostClick(post);
                    }}
                  >
                    <div className="popup-post-top">
                      <span className="popup-platform-tag" style={{ color: meta.color }}>
                        {renderPlatformIcon(post.platform)} {post.platform}
                      </span>
                      <span className="popup-time">{post.time}</span>
                    </div>
                    <p className="popup-caption-text">{post.caption}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* POST DETAILS & FULL EDIT MODAL */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="post-detail-modal" onClick={(e) => e.stopPropagation()} style={{ padding: '20px', background: '#fff', borderRadius: '8px', maxWidth: '450px', width: '90%' }}>
            <div className="modal-top-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <h3 style={{ color: getPlatformMeta(selectedPost.platform).color, margin: 0 }}>
                {isEditing ? 'Edit Post' : `${selectedPost.platform} Post`}
              </h3>
              <button onClick={() => setSelectedPost(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveEdit}>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Platform</label>
                  <select 
                    value={editFormData.platform} 
                    onChange={(e) => setEditFormData({ ...editFormData, platform: e.target.value })}
                    style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                  >
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Twitter">Twitter</option>
                    <option value="TikTok">TikTok</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Date</label>
                    <input 
                      type="date"
                      value={editFormData.dateStr} 
                      onChange={(e) => setEditFormData({ ...editFormData, dateStr: e.target.value })}
                      style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Time</label>
                    <input 
                      type="text"
                      placeholder="e.g. 10:00 AM"
                      value={editFormData.time} 
                      onChange={(e) => setEditFormData({ ...editFormData, time: e.target.value })}
                      style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Status</label>
                  <select 
                    value={editFormData.status} 
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                    style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Media URL / Base64</label>
                  <input 
                    type="text"
                    placeholder="Image or Video URL/Data"
                    value={editFormData.img || editFormData.video || editFormData.media || ''} 
                    onChange={(e) => setEditFormData({ ...editFormData, img: e.target.value })}
                    style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Caption</label>
                  <textarea 
                    value={editFormData.caption} 
                    onChange={(e) => setEditFormData({ ...editFormData, caption: e.target.value })}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '70px' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '15px' }}>
                  <button type="button" onClick={() => setIsEditing(false)} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc' }}>Cancel</button>
                  <button type="submit" style={{ padding: '6px 12px', borderRadius: '4px', background: '#ec4899', color: '#fff', border: 'none' }}>Save Changes</button>
                </div>
              </form>
            ) : (
              <div>
                {(() => {
                  const mediaSrc = selectedPost.img || selectedPost.video || selectedPost.media;
                  const isVideo = checkIsVideo(selectedPost);
                  if (!mediaSrc) return null;
                  return isVideo ? (
                    <video src={mediaSrc} controls style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }} />
                  ) : (
                    <img src={mediaSrc} alt="Post preview" style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }} />
                  );
                })()}
                <p style={{ margin: '4px 0' }}><strong>Caption:</strong> {selectedPost.caption}</p>
                <p style={{ margin: '4px 0' }}><strong>Date:</strong> {selectedPost.dateStr}</p>
                <p style={{ margin: '4px 0' }}><strong>Time:</strong> {selectedPost.time}</p>
                <p style={{ margin: '4px 0' }}><strong>Status:</strong> {selectedPost.status}</p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '15px' }}>
                  <button onClick={() => setIsEditing(true)} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc' }}>Edit</button>
                  <button onClick={() => handleDeletePost(selectedPost.id)} style={{ padding: '6px 12px', borderRadius: '4px', background: '#ef4444', color: '#fff', border: 'none' }}>Delete</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}