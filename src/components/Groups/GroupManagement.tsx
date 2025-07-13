import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Users, Plus, Mail, Upload, Download, Share2, FileText, Send } from 'lucide-react';

export const GroupManagement: React.FC = () => {
  const { userProfile } = useAuth();
  const [groups, setGroups] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupForm, setGroupForm] = useState({ name: '', description: '' });
  const [studentEmail, setStudentEmail] = useState('');
  const [sharedNotes, setSharedNotes] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  useEffect(() => {
    fetchGroups();
  }, [userProfile]);

  const fetchGroups = async () => {
    if (!supabase) {
      // Mock data for demo
      if (userProfile?.role === 'teacher') {
        setGroups([
          {
            id: '1',
            name: 'Grade 10 Science',
            description: 'Advanced science concepts for grade 10 students',
            created_at: new Date().toISOString(),
            group_members: [
              { id: '1', users: { name: 'John Doe', email: 'john@example.com' } },
              { id: '2', users: { name: 'Jane Smith', email: 'jane@example.com' } }
            ]
          },
          {
            id: '2',
            name: 'Mathematics Club',
            description: 'Extra mathematics practice and problem solving',
            created_at: new Date().toISOString(),
            group_members: [
              { id: '3', users: { name: 'Mike Johnson', email: 'mike@example.com' } }
            ]
          }
        ]);
      } else {
        setGroups([
          {
            id: '1',
            name: 'Grade 10 Science',
            description: 'Advanced science concepts for grade 10 students',
            created_at: new Date().toISOString(),
            teacher: { name: 'Dr. Smith', email: 'teacher@example.com' }
          }
        ]);
      }
      return;
    }
    
    try {
      if (userProfile.role === 'teacher') {
        const { data } = await supabase
          .from('groups')
          .select(`
            *,
            group_members (
              id,
              student_id,
              users (name, email)
            )
          `)
          .eq('teacher_id', userProfile.id);
        setGroups(data || []);
      } else {
        const { data } = await supabase
          .from('group_members')
          .select(`
            *,
            groups (
              id,
              name,
              description,
              teacher_id,
              users (name, email)
            )
          `)
          .eq('student_id', userProfile.id);
        setGroups(data?.map(item => item.groups) || []);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const createGroup = async () => {
    if (!supabase) {
      // Mock group creation
      const newGroup = {
        id: Date.now().toString(),
        name: groupForm.name,
        description: groupForm.description,
        created_at: new Date().toISOString(),
        group_members: []
      };
      setGroups([...groups, newGroup]);
      setShowCreateGroup(false);
      setGroupForm({ name: '', description: '' });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('groups')
        .insert({
          teacher_id: userProfile.id,
          name: groupForm.name,
          description: groupForm.description
        })
        .select()
        .single();

      if (error) throw error;

      setGroups([...groups, data]);
      setShowCreateGroup(false);
      setGroupForm({ name: '', description: '' });
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const addStudentToGroup = async (groupId: string) => {
    if (!studentEmail.trim()) return;

    if (!supabase) {
      // Mock student addition
      alert(`Student ${studentEmail} would be added to the group in a real implementation.`);
      setStudentEmail('');
      return;
    }
    
    try {
      // Find student by email
      const { data: student } = await supabase
        .from('users')
        .select('id')
        .eq('email', studentEmail)
        .eq('role', 'student')
        .single();

      if (!student) {
        alert('Student not found with this email');
        return;
      }

      // Add to group
      await supabase
        .from('group_members')
        .insert({
          group_id: groupId,
          student_id: student.id
        });

      setStudentEmail('');
      fetchGroups();
      alert('Student added successfully!');
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student. Please try again.');
    }
  };

  const shareNotesToGroup = async (groupId: string) => {
    if (!sharedNotes.trim()) return;

    // Mock note sharing
    alert(`Notes shared successfully to all group members!\n\nShared Notes:\n${sharedNotes}`);
    setSharedNotes('');
  };

  const uploadFile = async (groupId: string, file: File) => {
    if (!file) return;

    // Mock file upload
    const newFile = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      groupId: groupId
    };

    setUploadedFiles(prev => [...prev, newFile]);
    alert(`File "${file.name}" uploaded and shared with all group members!`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {userProfile?.role === 'teacher' ? 'My Groups' : 'Joined Groups'}
          </h1>
          <p className="text-gray-600">
            {userProfile?.role === 'teacher' 
              ? 'Manage your student groups and share resources' 
              : 'Access shared materials from your teachers'}
          </p>
        </div>
        
        {userProfile?.role === 'teacher' && (
          <button
            onClick={() => setShowCreateGroup(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </button>
        )}
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {groups.map((group: any) => (
          <div key={group.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{group.name}</h3>
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            
            <p className="text-gray-600 mb-4">{group.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{group.group_members?.length || 0} members</span>
              <span>Created {new Date(group.created_at).toLocaleDateString()}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedGroup(group)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Manage
              </button>
              {userProfile?.role === 'teacher' && (
                <button
                  onClick={() => document.getElementById(`file-${group.id}`)?.click()}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                </button>
              )}
              <input
                id={`file-${group.id}`}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadFile(group.id, file);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Group</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                <input
                  type="text"
                  value={groupForm.name}
                  onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter group name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={groupForm.description}
                  onChange={(e) => setGroupForm({ ...groupForm, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Enter group description"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowCreateGroup(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createGroup}
                disabled={!groupForm.name.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Group Management Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{selectedGroup.name}</h2>
              <button
                onClick={() => setSelectedGroup(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Add Student (Teachers only) */}
                {userProfile?.role === 'teacher' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Add Student</h3>
                    <div className="flex gap-3">
                      <input
                        type="email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Student email address"
                      />
                      <button
                        onClick={() => addStudentToGroup(selectedGroup.id)}
                        disabled={!studentEmail.trim()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}

                {/* Share Notes */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Share Notes</h3>
                  <div className="space-y-3">
                    <textarea
                      value={sharedNotes}
                      onChange={(e) => setSharedNotes(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Type your notes here to share with all group members..."
                    />
                    <button
                      onClick={() => shareNotesToGroup(selectedGroup.id)}
                      disabled={!sharedNotes.trim()}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Share Notes
                    </button>
                  </div>
                </div>

                {/* Uploaded Files */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Shared Files</h3>
                  <div className="space-y-2">
                    {uploadedFiles
                      .filter(file => file.groupId === selectedGroup.id)
                      .map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-blue-600 mr-3" />
                            <div>
                              <p className="font-medium text-gray-800">{file.name}</p>
                              <p className="text-sm text-gray-500">
                                {(file.size / 1024).toFixed(1)} KB • {file.uploadedAt.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    {uploadedFiles.filter(file => file.groupId === selectedGroup.id).length === 0 && (
                      <p className="text-gray-500 text-center py-4">No files shared yet</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Group Members */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Group Members</h3>
                  <div className="space-y-3">
                    {selectedGroup.group_members?.map((member: any) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-bold">
                              {member.users.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{member.users.name}</p>
                            <p className="text-sm text-gray-600">{member.users.email}</p>
                          </div>
                        </div>
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                    ))}
                    {(!selectedGroup.group_members || selectedGroup.group_members.length === 0) && (
                      <p className="text-gray-500 text-center py-4">No members yet</p>
                    )}
                  </div>
                </div>

                {/* Group Statistics */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-medium text-blue-800 mb-3">Group Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Total Members:</span>
                      <span className="font-medium text-blue-800">{selectedGroup.group_members?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Files Shared:</span>
                      <span className="font-medium text-blue-800">
                        {uploadedFiles.filter(file => file.groupId === selectedGroup.id).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Created:</span>
                      <span className="font-medium text-blue-800">
                        {new Date(selectedGroup.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-medium text-green-800 mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 text-green-700 hover:bg-green-100 rounded-lg transition-colors">
                      📧 Send group announcement
                    </button>
                    <button className="w-full text-left px-3 py-2 text-green-700 hover:bg-green-100 rounded-lg transition-colors">
                      📊 View group analytics
                    </button>
                    <button className="w-full text-left px-3 py-2 text-green-700 hover:bg-green-100 rounded-lg transition-colors">
                      🎯 Create group assignment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};