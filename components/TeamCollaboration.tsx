'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Plus, Share2, Settings, UserPlus, Trash2, Eye, Edit, Crown, X } from 'lucide-react'
import { db, auth, Team } from '@/lib/supabase'
import { GeneratedApp } from '@/types/app'
import toast from 'react-hot-toast'

interface TeamCollaborationProps {
  app?: GeneratedApp
  onClose: () => void
  isOpen?: boolean
}

export default function TeamCollaboration({ app, onClose, isOpen = false }: TeamCollaborationProps) {
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [isCreatingTeam, setIsCreatingTeam] = useState(false)
  const [isInvitingUser, setIsInvitingUser] = useState(false)
  const [newTeamName, setNewTeamName] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      loadUserAndTeams()
    }
  }, [isOpen])

  const loadUserAndTeams = async () => {
    try {
      const user = await auth.getCurrentUser()
      if (user) {
        setCurrentUser(user)
        const { data: userTeams } = await db.getUserTeams(user.id)
        setTeams(userTeams || [])
      }
    } catch (error) {
      console.error('Error loading teams:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTeam = async () => {
    if (!newTeamName.trim() || !currentUser) return

    try {
      const { data, error } = await db.createTeam(newTeamName, currentUser.id)
      if (error) throw error

      toast.success('Team created successfully!', {
        icon: '🎮',
        style: {
          background: '#1a1a1a',
          color: '#00FF00',
          border: '2px solid #00FF00',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '12px',
        },
      })

      setNewTeamName('')
      setIsCreatingTeam(false)
      loadUserAndTeams()
    } catch (error: any) {
      toast.error(error.message, {
        icon: '💥',
        style: {
          background: '#1a1a1a',
          color: '#FF0000',
          border: '2px solid #FF0000',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '12px',
        },
      })
    }
  }

  const inviteUser = async () => {
    if (!inviteEmail.trim() || !selectedTeam) return

    try {
      // In a real app, you'd send an email invitation
      // For now, we'll just add them to the team if they exist
      const { data, error } = await db.addTeamMember(selectedTeam.id, inviteEmail)
      if (error) throw error

      toast.success('User invited to team!', {
        icon: '👥',
        style: {
          background: '#1a1a1a',
          color: '#00FF00',
          border: '2px solid #00FF00',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '12px',
        },
      })

      setInviteEmail('')
      setIsInvitingUser(false)
      loadUserAndTeams()
    } catch (error: any) {
      toast.error(error.message, {
        icon: '💥',
        style: {
          background: '#1a1a1a',
          color: '#FF0000',
          border: '2px solid #FF0000',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '12px',
        },
      })
    }
  }

  const shareAppWithTeam = async (teamId: string) => {
    if (!app) return

    try {
      const { data, error } = await db.createCollaboration(
        app.id,
        teamId,
        currentUser.id,
        'owner'
      )
      if (error) throw error

      toast.success('App shared with team!', {
        icon: '🎮',
        style: {
          background: '#1a1a1a',
          color: '#00FF00',
          border: '2px solid #00FF00',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '12px',
        },
      })
    } catch (error: any) {
      toast.error(error.message, {
        icon: '💥',
        style: {
          background: '#1a1a1a',
          color: '#FF0000',
          border: '2px solid #FF0000',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '12px',
        },
      })
    }
  }

  if (loading) {
    return (
      <div className="arcade-card p-6">
        <div className="flex items-center justify-center">
          <div className="pacman-loader" style={{ width: 32, height: 32 }}></div>
          <span className="ml-4 pixel-text">Loading teams...</span>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="arcade-card w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="arcade-text text-xl">TEAM COLLABORATION</h2>
              <button
                onClick={onClose}
                className="text-arcade-gray hover:text-arcade-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Create Team Section */}
            <div className="mb-6">
              <button
                onClick={() => setIsCreatingTeam(!isCreatingTeam)}
                className="arcade-button flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Team</span>
              </button>

              <AnimatePresence>
                {isCreatingTeam && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-arcade-dark/50 border border-arcade-yellow/30 rounded"
                  >
                    <input
                      type="text"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      placeholder="Team name"
                      className="arcade-input w-full mb-3"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={createTeam}
                        className="arcade-button !text-sm !px-3 !py-1"
                      >
                        Create
                      </button>
                      <button
                        onClick={() => setIsCreatingTeam(false)}
                        className="arcade-button !text-sm !px-3 !py-1 bg-arcade-dark text-arcade-yellow"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Teams List */}
            <div className="space-y-4">
              <h3 className="arcade-text text-lg">Your Teams</h3>
              
              {teams.length === 0 ? (
                <p className="pixel-text text-arcade-gray">No teams yet. Create one to get started!</p>
              ) : (
                teams.map((team) => (
                  <div
                    key={team.id}
                    className="p-4 bg-arcade-dark/50 border border-arcade-yellow/30 rounded cursor-pointer hover:border-arcade-yellow/60 transition-colors"
                    onClick={() => setSelectedTeam(team)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="arcade-text text-base">{team.name}</h4>
                        <p className="pixel-text text-sm text-arcade-gray">
                          {team.members.length} member{team.members.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {team.owner_id === currentUser?.id && (
                          <Crown className="w-4 h-4 text-arcade-yellow" />
                        )}
                        <Users className="w-4 h-4 text-arcade-gray" />
                      </div>
                    </div>

                    {selectedTeam?.id === team.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 pt-4 border-t border-arcade-yellow/30"
                      >
                        <div className="flex space-x-2 mb-3">
                          <button
                            onClick={() => setIsInvitingUser(true)}
                            className="arcade-button !text-xs !px-2 !py-1 flex items-center space-x-1"
                          >
                            <UserPlus className="w-3 h-3" />
                            <span>Invite</span>
                          </button>
                          {app && (
                            <button
                              onClick={() => shareAppWithTeam(team.id)}
                              className="arcade-button !text-xs !px-2 !py-1 flex items-center space-x-1"
                            >
                              <Share2 className="w-3 h-3" />
                              <span>Share App</span>
                            </button>
                          )}
                        </div>

                        <AnimatePresence>
                          {isInvitingUser && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mb-3"
                            >
                              <input
                                type="email"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                placeholder="Email address"
                                className="arcade-input w-full mb-2 !text-sm"
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={inviteUser}
                                  className="arcade-button !text-xs !px-2 !py-1"
                                >
                                  Send Invite
                                </button>
                                <button
                                  onClick={() => setIsInvitingUser(false)}
                                  className="arcade-button !text-xs !px-2 !py-1 bg-arcade-dark text-arcade-yellow"
                                >
                                  Cancel
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="space-y-2">
                          <h5 className="pixel-text text-sm text-arcade-gray">Members:</h5>
                          {team.members.map((memberId, index) => (
                            <div
                              key={memberId}
                              className="flex items-center justify-between p-2 bg-arcade-darker rounded"
                            >
                              <span className="pixel-text text-xs">
                                {memberId === currentUser?.id ? 'You' : `Member ${index + 1}`}
                              </span>
                              <div className="flex items-center space-x-1">
                                {memberId === team.owner_id && (
                                  <Crown className="w-3 h-3 text-arcade-yellow" />
                                )}
                                <span className="pixel-text text-xs text-arcade-gray">
                                  {memberId === team.owner_id ? 'Owner' : 'Member'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* App Sharing Info */}
            {app && (
              <div className="mt-6 p-4 bg-arcade-dark/30 border border-arcade-cyan/30 rounded">
                <h4 className="arcade-text text-base mb-2">Share Current App</h4>
                <p className="pixel-text text-sm text-arcade-gray mb-3">
                  "{app.prompt}" - {app.framework}
                </p>
                <p className="pixel-text text-xs text-arcade-gray">
                  Select a team above to share this app with your collaborators.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 