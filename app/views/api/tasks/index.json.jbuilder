json.set! :tasks do
  json.array! @tasks do |task|
    json.extract! task, :id, :name, :is_done, :created_at, :updated_at

    # json.id         task.id
    # json.name       task.name
    # json.is_done    task.is_done
    # json.created_at task.created_at
    # json.updated_at task.updated_at
  end
end

# json.tasks do
#   json.array! @tweets, :id, :name, :is_done, :created_at, :updated_at
# end

# { "tasks": 
#   [
#     {"id":"id_1", "name":"name_1", "is_done":"is_done_1", "created_at":"created_at_1", "updated_at":"updated_at_1"}, 
#     {"id":"id_2", "name":"name_2", "is_done":"is_done_2", "created_at":"created_at_2", "updated_at":"updated_at_2"}
#   ] 
# }