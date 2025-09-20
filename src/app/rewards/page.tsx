import Card from '../components/ui/Card'

export default function Rewards() {
  const leaderboard = [
    { name: 'Prerna', points: 120 },
    { name: 'Abhay', points: 110 },
    { name: 'Simran', points: 95 }
  ]

  const perks = ['Premium Templates', '1-on-1 Mentorship', 'Exclusive Badge']

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
        {leaderboard.map(user => (
          <Card key={user.name} className="flex justify-between">
            <span>{user.name}</span>
            <span>{user.points} pts</span>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Redeemable Perks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {perks.map(perk => <Card key={perk}>{perk}</Card>)}
        </div>
      </div>
    </div>
  )
}
