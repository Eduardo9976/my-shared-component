#!/bin/bash

# Script para push automático baseado na branch
# Uso: ./push.sh [commit_message] ou ./push.sh MW-00000 "descrição"

current_branch=$(git branch --show-current)

# Verificar se o primeiro argumento é um ticket Jira
if [[ $1 =~ ^MW-[0-9]+$ ]]; then
    jira_ticket=$1
    commit_message=${2:-"Update from $current_branch branch"}
    full_message="$jira_ticket - feat: $commit_message"
else
    commit_message=${1:-"Update from $current_branch branch"}
    full_message="MW-00000 - feat: $commit_message"
fi

echo "🌿 Branch atual: $current_branch"
echo "📝 Commit message: $full_message"

# Adicionar todas as mudanças
git add .

# Fazer commit
git commit -m "$full_message"

# Push baseado na branch
if [ "$current_branch" = "development" ]; then
    echo "🚀 Fazendo push para GitHub (development branch)"
    git push github development
elif [ "$current_branch" = "develop" ]; then
    echo "🚀 Fazendo push para GitLab (develop branch)"
    git push gitlab develop
else
    echo "❌ Branch não configurada para push automático"
    echo "Branches configuradas: development (GitHub) e develop (GitLab)"
    exit 1
fi

echo "✅ Push concluído com sucesso!"
