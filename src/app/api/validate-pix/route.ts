import { NextResponse } from 'next/server';
import { decodificarPixEmv } from '@/lib/emv-parser';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const raw = body.payload || body.pix || '';

    if (!raw || typeof raw !== 'string') {
      return NextResponse.json(
        { error: 'Payload de Pix ou código de barras não fornecido ou inválido' },
        { status: 400 }
      );
    }

    const resultado = decodificarPixEmv(raw, body.beneficiarioEsperado);
    return NextResponse.json(resultado);
  } catch {
    return NextResponse.json(
      { error: 'Falha ao processar código Pix EMV / Boleto' },
      { status: 500 }
    );
  }
}
