import React, { useLayoutEffect, useRef, useState } from 'react'

export default function Bord() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    // 使用 Ref 存储坐标，避免触发组件重新渲染导致的卡顿
    const isDrawing = useRef(false)
    const strokeStyle = useRef('#b8d610')
    const [strokeColor, setStrokeColor] = useState('#b8d610')


    const points = useRef<{ x: number, y: number }[]>([])

    useLayoutEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // 初始化画布背景
        ctx.fillStyle = 'rgba(97, 99, 73, 0.1)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // 设置线条样式
     
        ctx.lineWidth = 4
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'

        const getPos = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        }

        const handleMouseDown = (e: MouseEvent) => {
            ctx.strokeStyle = strokeStyle.current as string
            isDrawing.current = true
            const { x, y } = getPos(e)
            ctx.beginPath()
            ctx.moveTo(x, y)
            points.current.push({ x, y })
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDrawing.current) return

            const { x, y } = getPos(e)
            
            // 【核心】实时连线
            ctx.lineTo(x, y)
            ctx.stroke()
            
            points.current.push({ x, y })
        }

        const stopDrawing = () => {
            if (!isDrawing.current) return
            isDrawing.current = false
            ctx.closePath()
            console.log("绘制完成，路径点数量:", points.current.length)
        }

        // 绑定事件
        canvas.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mousemove', handleMouseMove) // 窗口监听保证鼠标划出画布也能响应
        window.addEventListener('mouseup', stopDrawing)

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', stopDrawing)
        }
    }, [])

    return (
       <div>
         <canvas 
            ref={canvasRef} 
            width={1510} 
            height={1020} 
            style={{ display: 'block', cursor: 'crosshair', background: '#f0f0f0' }}
        />
        <div>
          <input type="color" value={strokeColor as string} onChange={(e) => {
            strokeStyle.current = e.target.value
            setStrokeColor(e.target.value)
          }} />
        </div>
       </div>
    )
}