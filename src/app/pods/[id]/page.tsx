import Card from '../../components/ui/Card'
import AIRoadmap from '../../components/ui/AIRoadmap'
import ChatPanel from '../../components/ui/ChatPanel'
import Button from '../../components/ui/Button'

export default function PodPage() {
  return (
    <div className="p-8 space-y-6">
      <Card className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI Chatbot</h2>
          <p className="text-gray-400 mt-1">Build a modular chatbot with AI integration</p>
        </div>
        <Button>Link GitHub Repository</Button>
      </Card>

      <AIRoadmap />
      <ChatPanel />
    </div>
  )
}
